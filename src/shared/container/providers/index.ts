import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implmentations/DayjsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJsDateProvider);
