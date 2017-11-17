import React, { Component } from 'react';
import './App.css';
import {Button, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap/lib';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { 
  Charts, 
  ChartContainer, 
  ChartRow, 
  YAxis, 
  LineChart } from 'react-timeseries-charts';
import { TimeSeries, TimeRange } from 'pondjs';


const style = {
   val: {
     stroke: "#000000",
     opacity: 0.5,
     width: 2,
   }
}

class App extends Component {
  constructor(props){
    super(props);
    
    this.measurementsFilter.bind(this);
    this.dropdownSelectionHandle.bind(this);

    this.state={
      flaskApiError: false, 
      data: [],
      pageLoadDate: "",
      sensorNames: [],
      sensorLocations: [],
      sensorMeasurementType: [],
      temperature: "loading",
      days: 7,
      button7: "success",
      button28: "primary",
      button365: "primary",
      focusName: "",
      timeRange: this.createTimeRange(7), 
      chartXAxisFormat: "day"
    }
  }


  componentDidMount() {
    this.setState({
      pageLoadDate: new Date()
    })
  };


  componentWillMount() {
    this.getDataFromApi() 
  };


  getDataFromApi() { 
    return fetch('/homesensors/api/v1.0/sensor_data', {credentials: 'same-origin'}) 
      .then((response) => response.json()) 
      .then((responseJson) => { 
        this.setState({ 
          data: responseJson.data
        }, () =>  this.measurementsFilterHandle(this.state.data, this.state.days))
      }) 
     .catch((error) => { 
        console.error(error);
        this.setState({  
          flaskApiError: "Failed to fetch data from API. Make sure that the flask API is running in the background and its available on the same network."
        })
    }); 
  }

  
  measurementsFilterHandle(arrObjects, days) {
    /*
      This method is put in place to setup the default number of days to display.
      I want to show data over 7 days as default, but if thats not the case and a
      sensor has turned off for some reason then the default needs to change to
      28 days and then 365 after that.
    */

    try {
      // filter actual data only
      var filteredArray = arrObjects.filter(el=> {
        return el.category === "actual" 
      });

    
      // slice last object
      if (filteredArray.slice(-1)[0] != null) {
        var lastObject = filteredArray.slice(-1)[0]
      }

      // convert date
      lastObject.dsCollected = new Date(lastObject.dsCollected)

      // get current date
      var currentDate = new Date()

      // length of one day
      var oneDay = 1000*60*60*24; 

      // convert dates to miliseconds
      var lastObjectDateMs = lastObject.dsCollected.getTime();
      var currentDateMs = currentDate.getTime();

      // calc diff
      var diffMs =  currentDateMs - lastObjectDateMs
 
      // convert to days
      var daysSinceLatestRecord = Math.round(diffMs/oneDay); 
      console.log(daysSinceLatestRecord)

      // set days to 7, 28 or 365 depending on last line of code
      // this ifelse statement provides an opportunity to override the default 
      // 7 day timeline.
      if (daysSinceLatestRecord <= 7) {
        days = 7
        this.setState({
          days: days,
          button7: "success",
          button28: "primary",
          button365: "primary",
          timeRange: this.createTimeRange(7),
          chartXAxisFormat: "day",
        }, () => this.measurementsFilter(arrObjects, days))
      } else if (daysSinceLatestRecord <= 28) {
        days = 28
        this.setState({
          days: days,
          button7: "primary",
          button28: "success",
          button365: "primary",
          timeRange: this.createTimeRange(28),
          chartXAxisFormat: "month", 
        }, () => this.measurementsFilter(arrObjects, days))
      } else {
        days = 365
        this.setState({
          days: days,
          button7: "primary",
          button28: "primary",
          button365: "success",
          timeRange: this.createTimeRange(365),
          chartXAxisFormat: "year", 
        }, () => this.measurementsFilter(arrObjects, days))
      } 
    } catch(err) {
      console.log(err)
    }
  }



  measurementsFilter(arrObjects, days) {
    try {

      // copy
      var data = arrObjects.slice();

       // get sensor attributes (this provides user selections)
      var names = this.sensorAttrList(data, "name")
      var locs = this.sensorAttrList(data, "location")
      var mtype = this.sensorAttrList(data, "measurementType")

      // convert date
      for (var j=0; j<data.length; j++){
        data[j].dsCollected = new Date(data[j].dsCollected)
      }

      // set start date using n days to filter date range
      var d = new Date(new Date().setDate(new Date().getDate()-days))

      // filter date interval (using prev line)
      var filteredArray = data.filter(el=> {
        return el.dsCollected >= d 
      });
 
     // filter "actuals" data 
      var actualsData = filteredArray.filter(el=> {
        return el.category === "actual"
      });

      // filter temp data 
      var tempArray = actualsData.filter(el=> {
        return el.measurementType === "temp"
      });

      // focus data on user selections
      var fName = this.focusSensorName(data, this.state.focusName, names)
      var fAttr = this.focusSensorValue(tempArray, fName)
      var fValue = fAttr[0]
      var fDate = fAttr[1]

      // create timeseries 
      var timeSeries = this.convertFocusDataToTimeseries(tempArray, fName)

     // filter "prediction" data 
      var predsData = filteredArray.filter(el=> {
        return el.category === "pred"
      });

      // filter prediction temp data 
      var predTempArray = predsData.filter(el=> {
        return el.measurementType === "temp"
      });

      // create timeseries 
      var predTimeSeries = this.convertFocusDataToTimeseries(predTempArray, fName)

      // save state
      this.setState({ 
        sensorNames: names,
        sensorLocations: locs,
        sensorMeasurementType: mtype,
        focusName: fName,
        focusValue: fValue,
        focusDate: fDate,
        temperature: tempArray,
        timeSeries: timeSeries,
        predTimeSeries: predTimeSeries,
        days: days
      })
    } catch (err) {
      console.log(err)
    }
  }


  createTimeRange(days) {

    var datePrev = new Date(new Date().setDate(new Date().getDate()-days)).getTime()
    var dateNow = new Date().getTime()

    if (days === 7){
      dateNow = new Date(new Date().setDate(new Date().getDate()+1)).getTime()
    } else if (days === 28) {
      dateNow = new Date(new Date().setDate(new Date().getDate()+7)).getTime()
    } else if (days === 365) {
      dateNow = new Date(new Date().setDate(new Date().getDate()+28)).getTime()
    } else {
      // ignore
    }

    return new TimeRange([datePrev, dateNow])
  }


  convertFocusDataToTimeseries(focusData, sensorName) {
    // create dictionary
    var data = {
      name: sensorName, 
      columns: ["time", "val"],
      points: []
    }
     
    // filter tempArray by fName
    var focusArray = focusData.filter(el=> {
      return el.name === sensorName
    })
 
    // loop through data and add to points in the dictionary above
    for (var i=0; i<focusArray.length; i++){
      var date = focusArray[i].dsCollected
      var dataPoint = [date.getTime(), focusArray[i].value]
      data["points"].push(dataPoint)
    }

    // return 
    return new TimeSeries(data)
  }


  convertPredictionsToTimeseries(predictions, sensorName){
    return "nothing done so far"
  }
  

  sensorAttrList(fArray, key) {
    var sensorAttributes = [];
    for (var i=0; i<fArray.length; i++){
      if (sensorAttributes.includes(fArray[i][key])){
        continue
      } else {
        sensorAttributes.push(fArray[i][key])
      }    
    }
    return sensorAttributes
  }


  focusSensorName(fArray, sensorName, namesList) {

    //console.log("fArray", fArray.slice(-1)[0])

    // name of sensor with most recent record
    var startName = fArray.slice(-1)[0]["name"]

    // set sensor name to focus on
    var fName = (sensorName === "" & namesList.length >= 1) 
       ? startName
       : sensorName


    return fName
  }

  focusSensorValue(fArray, sensorName) {
    // filter data by sensor name 
    // then, take the most recent record (last record)
    var fValue = fArray.filter(el=> {
      return el.name === sensorName 
    });
    var res = []
    var dateNow = new Date()
    
    //console.log(dateNow.toString())

    // treat undefined variable (occurs when filter returns no data)
    if (fValue.slice(-1)[0] == null) {
      res.push("No data")
      res.push("")
    } else {

      //console.log(fValue.slice(-1)[0]["dsCollected"].toString())

      res.push(fValue.slice(-1)[0]["value"] + "°C")
      // 36e5 = 60*60*1000
      var hours = Math.floor(Math.abs(dateNow - fValue.slice(-1)[0]["dsCollected"])/36e5)
      var mins = Math.floor((Math.abs(dateNow - fValue.slice(-1)[0]["dsCollected"])/(60*1000))%60) 
      res.push(hours + " hours " + mins + " mins ago") 
    } 

    //console.log(res)
    return res
  }


  buttonHandle(days){
    this.measurementsFilter(this.state.data, days)
    this.setState({
        timeRange: this.createTimeRange(days)
    })

    if (days === 7) {
      this.setState({
        button7: "success", //change color of button7 to green
        button28: "primary",
        button365: "primary",
        chartXAxisFormat: "day"
      })
    } else if (days === 28) {
      this.setState({
        button7: "primary", 
        button28: "success",
        button365: "primary",
        chartXAxisFormat: "month"
      })
    } else {
      this.setState({
        button7: "primary", 
        button28: "primary",
        button365: "success",
        chartXAxisFormat: "year"
      })
    }
  }


  dropdownSelectionHandle(sn, n){
    var fAttr = this.focusSensorValue(this.state.temperature, sn[n])
    var timeSeries = this.convertFocusDataToTimeseries(this.state.temperature, sn[n])
    this.setState({
      focusName: sn[n],
      focusValue: fAttr[0],
      focusDate: fAttr[1],
      timeSeries: timeSeries
    })
  }

  render() {
    let button7col = this.state.button7;
    let button28col = this.state.button28;
    let button365col = this.state.button365;
    let sn = this.state.sensorNames

    let menuItems = []
    for (var i=0; i < this.state.sensorNames.length; i++){
      var key = i.toString()
      menuItems.push(<MenuItem key={key} eventKey={key}>
                       {this.state.sensorNames[i]}
                     </MenuItem>)
    }

    
    const buttonsInstance = (
     <div className="wrapper">
      <ButtonToolbar>
        <DropdownButton bsStyle="info" 
 
          id="1"
          title={this.state.focusName}
          onSelect = {this.dropdownSelectionHandle.bind(this, sn)}
          >
            {menuItems}
        </DropdownButton>
        <Button 
           bsStyle={button7col}
           onClick={this.buttonHandle.bind(this, 7)}>
           7 days
        </Button>
        <Button 
           bsStyle={button28col}
           onClick={this.buttonHandle.bind(this, 28)}>
           28 days
        </Button>
        <Button 
           bsStyle={button365col}
           onClick={this.buttonHandle.bind(this, 365)}>
           1 year
        </Button>

      </ButtonToolbar>
     </div>
    );

    if (this.state.timeSeries){
     console.log(this.state.timeRange.toString())
     console.log(this.state.timeSeries.toString())
     console.log(this.state.timeSeries.size())

     var chart = (
       <div className="wrapper">
        <ChartContainer 
              format={this.state.chartXAxisFormat}
              timeRange={this.state.timeRange} 
              width={300} 
              showGrid={false}>
          <ChartRow height="220">
            <YAxis id="axis1" label="MType" min={0} max={50} width="20" type="linear" format=".0f"/>
              <Charts>
                <LineChart 
                     axis="axis1" 
                     series={this.state.timeSeries} 
                     columns={["val"]}/>
                <LineChart 
                     axis="axis1" 
                     series={this.state.predTimeSeries} 
                     columns={["val"]}
                />
              </Charts>
          </ChartRow>
        </ChartContainer> 
       </div>
     )
    }
      
 


    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Garden Monitor</h1>
          <p> {String(this.state.pageLoadDate)} </p>
        </header>

        {buttonsInstance}  
        {this.state.flaskApiError}

        <div className="TempContainer">
          <h1 className="TempValue">{this.state.focusValue}</h1>
          <p>{this.state.focusDate}</p>
        </div>
        {chart}

      </div>
    );
  }
}

export default App;
