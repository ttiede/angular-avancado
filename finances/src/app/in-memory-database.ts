import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService{
    createDb() {
        const categories = [
            {id: 1, name: "Lazer", description: "cinema, pipoca, bar etc"}
        ]
        return { categories};
    }
}