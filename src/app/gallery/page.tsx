import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "گالری رستوران باربیکیو | Barbecue Restaurant Gallery",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
