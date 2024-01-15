import { ISensorDataCreate } from "../../../internal/domain/interface/sensor.data";
import { SensorManagerInstance } from "../../../internal/domain/manager/sensor";
import { SensorDataManagerInstance } from "../../../internal/domain/manager/sensor.data";

export async function saveData(req: string) {
    const payload = JSON.parse(req) as ISensorDataCreate;
    if ((await SensorManagerInstance.exist(payload.sensor)) == false) return;
    await SensorDataManagerInstance.create(payload);
}
