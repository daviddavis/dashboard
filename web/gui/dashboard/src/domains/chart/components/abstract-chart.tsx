import React, { useCallback } from "react"

import { setGlobalChartUnderlayAction, setGlobalPanAndZoomAction } from "domains/global/actions"
import { useDispatch } from "react-redux"
import { Attributes } from "../utils/transformDataAttributes"
import {
  ChartData, ChartDetails, DygraphData, EasyPieChartData,
} from "../chart-types"
import { ChartLibraryName } from "../utils/chartLibrariesSettings"

import { DygraphChart } from "./lib-charts/dygraph-chart"
import { EasyPieChart } from "./lib-charts/easy-pie-chart"

interface Props {
  attributes: Attributes
  chartData: ChartData
  chartDetails: ChartDetails
  chartLibrary: ChartLibraryName
  colors: {
    [key: string]: string
  }
  chartUuid: string
  chartWidth: number
  dimensionsVisibility: boolean[]
  isRemotelyControlled: boolean
  legendFormatValue: ((v: number | string) => number | string)
  orderedColors: string[]
  hoveredX: number | null
  onUpdateChartPanAndZoom: (arg: { after: number, before: number, masterID: string }) => void

  hoveredRow: number
  setHoveredX: (hoveredX: number | null, noMaster?: boolean) => void
  setMinMax: (minMax: [number, number]) => void
  showLatestOnBlur: boolean
  unitsCurrent: string
  viewAfter: number,
  viewBefore: number,
}

export const AbstractChart = ({
  attributes,
  chartData,
  chartDetails,
  chartLibrary,
  colors,
  chartUuid,
  chartWidth,
  dimensionsVisibility,
  isRemotelyControlled,
  legendFormatValue,
  orderedColors,
  hoveredRow,
  hoveredX,
  onUpdateChartPanAndZoom,
  setHoveredX,
  setMinMax,
  unitsCurrent,
  viewAfter,
  viewBefore,
}: Props) => {
  const dispatch = useDispatch()

  const setGlobalChartUnderlay = useCallback(({ after, before, masterID }) => {
    dispatch(setGlobalChartUnderlayAction({ after, before, masterID }))

    // freeze charts
    // don't send masterID, so no padding is applied
    dispatch(setGlobalPanAndZoomAction({ after: viewAfter, before: viewBefore }))
  }, [dispatch, viewAfter, viewBefore])

  if (chartLibrary === "easypiechart") {
    return (
      <EasyPieChart
        attributes={attributes}
        chartData={chartData as EasyPieChartData}
        chartDetails={chartDetails}
        chartLibrary={chartLibrary}
        chartWidth={chartWidth}
        colors={colors}
        chartUuid={chartUuid}
        dimensionsVisibility={dimensionsVisibility}
        isRemotelyControlled={isRemotelyControlled}
        legendFormatValue={legendFormatValue}
        orderedColors={orderedColors}
        hoveredRow={hoveredRow}
        hoveredX={hoveredX}
        onUpdateChartPanAndZoom={onUpdateChartPanAndZoom}
        setGlobalChartUnderlay={setGlobalChartUnderlay}
        setHoveredX={setHoveredX}
        setMinMax={setMinMax}
        unitsCurrent={unitsCurrent}
        viewAfter={viewAfter}
        viewBefore={viewBefore}
      />
    )
  }

  return (
    <DygraphChart
      attributes={attributes}
      chartData={chartData as DygraphData}
      chartDetails={chartDetails}
      chartLibrary={chartLibrary}
      colors={colors}
      chartUuid={chartUuid}
      dimensionsVisibility={dimensionsVisibility}
      isRemotelyControlled={isRemotelyControlled}
      legendFormatValue={legendFormatValue}
      orderedColors={orderedColors}
      hoveredRow={hoveredRow}
      hoveredX={hoveredX}
      onUpdateChartPanAndZoom={onUpdateChartPanAndZoom}
      setGlobalChartUnderlay={setGlobalChartUnderlay}
      setHoveredX={setHoveredX}
      setMinMax={setMinMax}
      unitsCurrent={unitsCurrent}
      viewAfter={viewAfter}
      viewBefore={viewBefore}
    />
  )
}
