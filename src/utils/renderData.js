import { 
    ClockCircleFilled, 
    SunFilled, 
    MoonFilled, 
    BoxPlotTwoTone, 
    TabletTwoTone 
} from '@ant-design/icons';
import { format } from 'date-fns';

export const statusTypes = [
    {
     value: "CHECKED OUT",
     color: "blue",
     text: "Checked out"
   },
    {
     value: "NOT CONFIRMED",
     color: "yellow",
     text: "Not Confirmed"
   },
    {
     value: "SEATED",
     color: "brown",
     text: "Seated"
   },
    {
     value: "CONFIRMED",
     color: "green",
     text: "Confirmed"
   },
 ]


 export const ShiftTypes = [
     { value: 'BREAKFAST', text: 'Breakfast', icon: <ClockCircleFilled /> },
     { value: 'LUNCH', text: 'Lunch', icon: <SunFilled /> },
     { value: 'DINNER', text: 'Dinner', icon: <MoonFilled /> },
 ]

 export const AreaTypes = [
    { value: 'BAR', text: 'Bar', icon: <BoxPlotTwoTone /> },
    { value: 'MAIN ROOM', text: 'Main Room', icon: <TabletTwoTone /> },
]

export function dataFiltration(item, filters, dateFormate) {
    const matchName =
    item.customer.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
    item.customer.lastName.toLowerCase().includes(filters.search.toLowerCase());

  const matchStatus = filters.status ? item.status === filters.status : true;

  const matchShift = filters.shift ? item.shift === filters.shift : true;

  const matchArea = filters.area ? item.area === filters.area : true;

  const matchDate = filters.date ? format( new Date(item.businessDate), dateFormate)
   === format( new Date(filters.date), dateFormate) : true
   
  return matchName && matchStatus && matchShift && matchArea && matchDate ;
}