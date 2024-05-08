import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import Labels from '../labels/Income_labels';
import { chart_Data, getTotal } from '../../helpers/helper'
import {default as api} from '../../store/apiSlice';
import Expence_Labels from '../labels/ExpenceLabels';

Chart.register(ArcElement);

export default function Expence_Graph() {

  const { data, isFetching , isSuccess, isError } = api.useGetExpenceLabelsQuery()
  let graphData;

  

  if(isFetching){
    graphData = <div>Fetching</div>;
  }else if(isSuccess){
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>;
  }else if(isError){
    graphData = <div>Error</div>
  }


  return (
    <div className="flex justify-content max-w-xs mx-auto">
        <div className="item">
            <div className="chart relative">
                {graphData}
                
            </div>   

            <div className="flex flex-col py-10 gap-4">
                {/* Labels */}
                <Expence_Labels/>
            </div> 
        </div>
    </div>
  )
}
