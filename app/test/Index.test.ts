import { handler } from "../src/index"

describe("CreateClientService", () => {

    it("Test", async () => {
        let response = handler(null)
        expect(response).toBeTruthy();

    });
});
