"""Append an update to a master prompt without rewriting its existing content."""

import argparse
from datetime import date
from io import BytesIO
from pathlib import Path
import re
from tempfile import NamedTemporaryFile
from xml.etree import ElementTree
from xml.sax.saxutils import escape
from zipfile import ZipFile


ARCHIVE = Path(__file__).resolve().parents[1] / "docs" / "master-prompts"
DOCUMENT_PART = "word/document.xml"
WORD_NAMESPACE = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def paragraph(text: str, bold: bool = False) -> bytes:
    emphasis = "<w:rPr><w:b/></w:rPr>" if bold else ""
    return (
        f'<w:p><w:r>{emphasis}<w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
    ).encode("utf-8")


def append_update(path: Path, heading: str, paragraphs: list[str]) -> None:
    output = BytesIO()
    with ZipFile(path) as original, ZipFile(output, "w") as updated:
        document = original.read(DOCUMENT_PART)
        body = ElementTree.fromstring(document).find(f"{WORD_NAMESPACE}body")
        marker = document.rfind(b"<w:sectPr")
        if body is None or not len(body) or body[-1].tag != f"{WORD_NAMESPACE}sectPr" or marker < 0:
            raise ValueError("Expected a terminal section in the master prompt's document body.")
        if escape(heading).encode("utf-8") in document:
            raise ValueError("An update with this heading already exists.")

        addition = paragraph(heading, bold=True) + b"".join(paragraph(text) for text in paragraphs)
        revised = document[:marker] + addition + document[marker:]
        ElementTree.fromstring(revised)
        updated.comment = original.comment
        for member in original.infolist():
            updated.writestr(member, revised if member.filename == DOCUMENT_PART else original.read(member))

    with NamedTemporaryFile(dir=path.parent, delete=False) as temporary:
        replacement = Path(temporary.name)
        temporary.write(output.getbuffer())
    try:
        replacement.replace(path)
    finally:
        replacement.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("document", choices=sorted(path.name for path in ARCHIVE.glob("Prompt*.docx")))
    parser.add_argument("version", help="milestone in vX.Y.Z form")
    parser.add_argument("date", type=date.fromisoformat)
    parser.add_argument("title")
    parser.add_argument("body_file", type=Path, help="UTF-8 text file with one paragraph per nonblank line")
    arguments = parser.parse_args()
    if not re.fullmatch(r"v\d+\.\d+\.\d+", arguments.version):
        parser.error("version must use vX.Y.Z")

    lines = [line.strip() for line in arguments.body_file.read_text(encoding="utf-8").splitlines()]
    paragraphs = [line for line in lines if line]
    if not paragraphs or not arguments.title.strip():
        parser.error("an update needs a heading and at least one paragraph")

    heading = f"{arguments.version} {arguments.title.strip()} ({arguments.date})"
    try:
        append_update(ARCHIVE / arguments.document, heading, paragraphs)
    except ValueError as error:
        parser.error(str(error))
    print(f"Appended {heading} to {arguments.document}.")


if __name__ == "__main__":
    main()
