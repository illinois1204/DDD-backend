import { ISensorDataCreate } from "../../../internal/domain/interface/sensor.data";
import { SensorServiceInstance } from "../../../internal/domain/service/sensor";
import { SensorDataServiceInstance } from "../../../internal/domain/service/sensor.data";
import { AmqpRequest } from "../settings";

export async function saveData(req: AmqpRequest) {
    const payload = JSON.parse(req.content) as ISensorDataCreate;
    if ((await SensorServiceInstance.exist(payload.sensor)) == false) return;
    await SensorDataServiceInstance.new(payload);
}
