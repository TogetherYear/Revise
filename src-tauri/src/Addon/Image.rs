use image::{imageops::FilterType, ImageFormat};
use serde::{Deserialize, Serialize};
use tauri::command;

#[command]
pub fn ConvertImageFormat(originPath: String, convertPath: String, options: ImageOptions) {
    let mut r = image::open(originPath).unwrap();
    if options.width != 0
        && options.height != 0
        && (options.width != r.width() || options.height != r.height())
    {
        match options.keepAspectRatio {
            true => {
                r = r.resize(
                    options.width,
                    options.height,
                    TransformFilter(options.filter),
                )
            }
            false => {
                r = r.resize_exact(
                    options.width,
                    options.height,
                    TransformFilter(options.filter),
                )
            }
        }
    }
    r.save_with_format(convertPath, TransformFormat(options.format))
        .unwrap();
}

fn TransformFormat(format: u32) -> ImageFormat {
    match format {
        0 => ImageFormat::Png,
        1 => ImageFormat::Jpeg,
        2 => ImageFormat::Gif,
        3 => ImageFormat::WebP,
        4 => ImageFormat::Pnm,
        5 => ImageFormat::Tiff,
        6 => ImageFormat::Tga,
        7 => ImageFormat::Dds,
        8 => ImageFormat::Bmp,
        9 => ImageFormat::Ico,
        10 => ImageFormat::Hdr,
        11 => ImageFormat::OpenExr,
        12 => ImageFormat::Farbfeld,
        13 => ImageFormat::Avif,
        14 => ImageFormat::Qoi,
        _ => ImageFormat::WebP,
    }
}

fn TransformFilter(filter: u32) -> FilterType {
    match filter {
        0 => FilterType::Nearest,
        1 => FilterType::Triangle,
        2 => FilterType::CatmullRom,
        3 => FilterType::Gaussian,
        4 => FilterType::Lanczos3,
        _ => FilterType::Nearest,
    }
}

#[derive(Serialize, Deserialize)]
pub struct ImageOptions {
    format: u32,
    keepAspectRatio: bool,
    width: u32,
    height: u32,
    filter: u32,
}
