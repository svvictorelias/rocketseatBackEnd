import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInmemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInmemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInmemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test name",
      brand: "Test branch",
      category_id: "1",
      daily_rate: 50,
      description: "Teste description",
      fine_amount: 70,
      license_plate: "ABC-1234"
    });

    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Test name",
        brand: "Test branch",
        category_id: "1",
        daily_rate: 50,
        description: "Teste description",
        fine_amount: 70,
        license_plate: "ABC-1234"
      });
      await createCarUseCase.execute({
        name: "Test name2",
        brand: "Test branch2",
        category_id: "2",
        daily_rate: 70,
        description: "Teste description2",
        fine_amount: 90,
        license_plate: "ABC-1234"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test name",
      brand: "Test branch",
      category_id: "1",
      daily_rate: 50,
      description: "Teste description",
      fine_amount: 70,
      license_plate: "ABC-1234"
    });
    expect(car.available).toBe(true);
  });
});
