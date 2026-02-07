import {
  filterImages,
  sortByOrientation,
  getVisibleImages
} from "../gallery-utils.js";

describe("gallery-utils", () => {
  const mockImages = [
    {
      id: "1",
      category: "jellyfish",
      orientation: "portrait",
      tags: ["manet", "hav"]
    },
    {
      id: "2",
      category: "eagle",
      orientation: "landscape",
      tags: ["örn", "fågel"]
    },
    {
      id: "3",
      category: "jellyfish",
      orientation: "landscape",
      tags: ["manet", "vatten"]
    }
  ];

  describe("filterImages", () => {
    test("filters by category", () => {
      const result = filterImages(mockImages, { category: "jellyfish" });
      expect(result).toHaveLength(2);
    });

    test("filters by tag", () => {
      const result = filterImages(mockImages, { activeTag: "örn" });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    test("filters by search query", () => {
      const result = filterImages(mockImages, { query: "vatten" });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });

    test("returns all images when no filters are applied", () => {
      const result = filterImages(mockImages, {});
      expect(result).toHaveLength(3);
    });
  });

  describe("sortByOrientation", () => {
    test("sorts portrait images before landscape", () => {
      const sorted = [...mockImages].sort(sortByOrientation);
      expect(sorted[0].orientation).toBe("portrait");
    });
  });

  describe("getVisibleImages", () => {
    test("returns only the specified number of images", () => {
      const result = getVisibleImages(mockImages, 2);
      expect(result).toHaveLength(2);
    });

    test("returns empty array when count is 0", () => {
      const result = getVisibleImages(mockImages, 0);
      expect(result).toEqual([]);
    });
  });
});