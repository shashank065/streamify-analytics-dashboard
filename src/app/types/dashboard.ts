export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
  percentage?: number;
}

export interface CustomPayload {
  value: number;
  name: string;
  payload: ChartDataPoint;
  color?: string;
}

export interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: ChartDataPoint;
  percent: number;
  value: number;
  name: string;
} 