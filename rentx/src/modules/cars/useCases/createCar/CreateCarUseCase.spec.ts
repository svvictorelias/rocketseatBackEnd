import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInmemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInmemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInmemory);
  });
  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Test name",
      brand: "Test branch",
      category_id: "1",
      daily_rate: 50,
      description: "Teste description",
      fine_amount: 70,
      license_plate: "ABC-1234"
    });
  });
});
