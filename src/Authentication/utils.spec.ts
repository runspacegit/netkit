import { str2ab, ab2str } from "./utils"

describe("Authentication Utils", () => {
    test("str2ab -> ab2str", () => {
        expect(ab2str(str2ab("test"))).toBe("test");
    })
})
