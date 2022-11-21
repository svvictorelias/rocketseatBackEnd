import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });
  it("should not be able to add a new specification to a no-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["5456"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test name",
      brand: "Test branch",
      category_id: "1",
      daily_rate: 50,
      description: "Teste description",
      fine_amount: 70,
      license_plate: "ABC-1234"
    });
    const car_id = car.id;
    const specifications_id = ["5456"];
    await createCarSpecificationUseCase.execute({ car_id, specifications_id });
  });
});
