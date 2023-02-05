import { DateTime } from "luxon"

export const formatDate = (date: number) => {
  const luxonDate = DateTime.fromSeconds(date)
  return luxonDate.setLocale("en").toLocaleString({
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
