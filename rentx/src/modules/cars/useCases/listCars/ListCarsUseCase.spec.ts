import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Car branch",
      category_id: "category_id",
      daily_rate: 50,
      description: "Car description",
      fine_amount: 70,
      license_plate: "ABC-1234"
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Car_branch",
      category_id: "Car_brand_test",
      daily_rate: 50,
      description: "Car description",
      fine_amount: 70,
      license_plate: "ABC-1234"
    });
    const cars = await listCarsUseCase.execute({ brand: "Car_brand_test" });
    expect(cars).toEqual([car]);
  });
});
