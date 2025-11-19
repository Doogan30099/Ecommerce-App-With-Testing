import { render, screen, fireEvent } from "@testing-library/react";
import ImageWithFallback from "../components/ImageWithFallback";
import "@testing-library/jest-dom";

describe("ImageWithFallback", () => {
  test("renders initial image src", () => {
    render(
      <ImageWithFallback src="https://example.com/image.png" alt="Example" />
    );
    const img = screen.getByAltText("Example") as HTMLImageElement;
    expect(img.src).toContain("https://example.com/image.png");
  });

  test("replaces src with placeholder on error", () => {
    render(<ImageWithFallback src="broken-url.png" alt="Broken" />);
    const img = screen.getByAltText("Broken");

    
    fireEvent.error(img);

    expect((img as HTMLImageElement).src).toContain(
      "https://via.placeholder.com/200x200"
    );
  });
});
