import { ISensorDataCreate } from "../../../internal/domain/interface/sensor.data";
import { SensorServiceInstance } from "../../../internal/domain/service/sensor";
import { SensorDataServiceInstance } from "../../../internal/domain/service/sensor.data";

export async function saveData(req: string) {
    const payload = JSON.parse(req) as ISensorDataCreate;
    if ((await SensorServiceInstance.exist(payload.sensor)) == false) return;
    await SensorDataServiceInstance.new(payload);
}
