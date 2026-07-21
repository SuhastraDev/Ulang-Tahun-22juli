from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter


BASE_DIR = Path(__file__).resolve().parents[1]
SOURCE_DIR = BASE_DIR / "assets" / "characters"
OUTPUT_DIR = SOURCE_DIR / "processed"

TOLERANCES = {
    "adek.jpg": 58,
    "akak.jpg": 62,
    "jihan.jpg": 46,
    "mbak ana.jpg": 62,
    "penjaga waktu.jpg": 50,
    "yuk ulan.jpg": 48,
}


def color_distance(a, b):
    return sum((int(a[index]) - int(b[index])) ** 2 for index in range(3)) ** 0.5


def remove_edge_background(path):
    image = Image.open(path).convert("RGBA")
    pixels = image.load()
    width, height = image.size
    tolerance = TOLERANCES.get(path.name, 55)
    visited = set()
    queue = deque()

    for x in range(width):
        queue.append((x, 0, pixels[x, 0][:3]))
        queue.append((x, height - 1, pixels[x, height - 1][:3]))

    for y in range(height):
        queue.append((0, y, pixels[0, y][:3]))
        queue.append((width - 1, y, pixels[width - 1, y][:3]))

    alpha = Image.new("L", (width, height), 255)
    alpha_pixels = alpha.load()

    while queue:
        x, y, seed = queue.popleft()
        if (x, y) in visited:
            continue

        visited.add((x, y))
        current = pixels[x, y][:3]

        if color_distance(current, seed) > tolerance:
            continue

        alpha_pixels[x, y] = 0

        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                queue.append((nx, ny, seed))

    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.45))
    image.putalpha(alpha)

    bbox = image.getbbox()
    if bbox:
        image = image.crop(bbox)

    return image


def main():
    OUTPUT_DIR.mkdir(exist_ok=True)

    for path in SOURCE_DIR.glob("*.jpg"):
        processed = remove_edge_background(path)
        out_path = OUTPUT_DIR / f"{path.stem}.png"
        processed.save(out_path)
        print(out_path.relative_to(BASE_DIR))


if __name__ == "__main__":
    main()
