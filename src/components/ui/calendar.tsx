import React from "react"
import {
  createCalendar,
  getLocalTimeZone,
  getWeeksInMonth,
  isToday,
  type CalendarDate,
} from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  useButton,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useLocale,
  type AriaCalendarGridProps,
  type DateValue,
} from "react-aria"
import {
  useCalendarState,
  type CalendarState,
  type CalendarStateOptions,
} from "react-stately"

import { cn } from "@/lib/utils"

import { Button } from "./button"

/* -------------------------------------------------------------------------------------------------
 * Calendar
 * -----------------------------------------------------------------------------------------------*/

interface CalendarProps<T extends DateValue = DateValue>
  extends Omit<CalendarStateOptions<T>, "locale" | "createCalendar"> {
  locale?: string
}

export function Calendar(props: CalendarProps) {
  const { locale } = useLocale()
  const state = useCalendarState({ ...props, locale, createCalendar })
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state)

  return (
    <div {...calendarProps} className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          {...useButton(prevButtonProps, React.useRef(null)).buttonProps}
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-medium">{title}</h2>
        <Button
          {...useButton(nextButtonProps, React.useRef(null)).buttonProps}
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CalendarGrid
 * -----------------------------------------------------------------------------------------------*/

interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState
}
function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table {...gridProps} className="w-full border-collapse space-y-1">
      <thead {...headerProps}>
        <tr className="flex">
          {weekDays.map((day, index) => (
            <th
              key={index}
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex} className="mt-2 flex w-full">
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CalendarCell
 * -----------------------------------------------------------------------------------------------*/

interface CalendarCellProps {
  state: CalendarState
  date: CalendarDate
}

function CalendarCell({ state, date }: CalendarCellProps) {
  const ref = React.useRef(null)
  const {
    cellProps,
    buttonProps,
    formattedDate,
    isOutsideVisibleRange,
    isSelected,
  } = useCalendarCell({ date }, state, ref)

  return (
    <td
      {...cellProps}
      className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
    >
      <Button
        {...buttonProps}
        ref={ref}
        variant="ghost"
        className={cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100", {
          "text-muted-foreground opacity-50": isOutsideVisibleRange,
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground":
            isSelected,
          "bg-accent text-accent-foreground": isToday(date, getLocalTimeZone()),
        })}
      >
        {formattedDate}
      </Button>
    </td>
  )
}
