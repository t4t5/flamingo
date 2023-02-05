import reloadOnUpdate from "virtual:reload-on-update-in-background-script"

import { listener } from "./event-handler"

reloadOnUpdate("pages/background")

listener()
