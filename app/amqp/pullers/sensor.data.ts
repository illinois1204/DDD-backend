import { ISensorDataCreate } from "../../../internal/domain/interface/sensor.data";
import { SensorManagerInstance } from "../../../internal/domain/manager/sensor";
import { SensorDataManagerInstance } from "../../../internal/domain/manager/sensor.data";
import { AmqpRequest } from "../settings";

export async function saveData(req: AmqpRequest) {
    const payload = JSON.parse(req.content) as ISensorDataCreate;
    if ((await SensorManagerInstance.exist(payload.sensor)) == false) return;
    await SensorDataManagerInstance.new(payload);
}
