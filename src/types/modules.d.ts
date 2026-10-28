declare module "heic-convert" {
  interface ConvertOptions {
    buffer: Buffer | ArrayBufferLike;
    format: "JPEG" | "PNG";
    quality?: number;
  }
  export default function convert(
    options: ConvertOptions,
  ): Promise<ArrayBuffer>;
}
