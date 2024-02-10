import { handler } from "../index"

describe("CreateClientService", () => {

    it("Test", async () => {
        let response = handler(null)
        expect(response).toBeTruthy();

    });
});
