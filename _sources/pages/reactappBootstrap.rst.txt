React App: Bootstrap
======================

Aim
----
Add styles to the reactapp. 


Summary
--------

Add several buttons to filter data and show the most recent temperature. Note I have focussed on temperature only.

Code listing
-------------


.. code-block:: psql

    import React, { Component } from 'react'
    import './App.css'
    import {Button, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap/lib'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/css/bootstrap-theme.css'


    class App extends Component {
        constructor(props){
        super(props)
    
        this.measurementsFilter.bind(this)
        this.dropdownSelectionHandle.bind(this)

        this.state={
            data: [],
            pageLoadDate: "",
            sensorNames: [],
            sensorLocations: [],
            sensorMeasurementType: [],
            temperature: "loading",
            days: 28,
            button7: "primary",
            button28: "success",
            button365: "primary",
            focusName: "" 
        }

    }

    componentDidMount() {
        this.setState({
            pageLoadDate: new Date()
        })
    }

    componentWillMount() {
        this.getDataFromApi() 
    }


    getDataFromApi() { 
        return fetch('/homesensors/api/v1.0/sensor_data', {credentials: 'same-origin'}) 
            .then((response) => response.json()) 
            .then((responseJson) => { 
                this.setState({ 
                    data: responseJson.data
            }, () =>  this.measurementsFilter(this.state.data, this.state.days))
            }) 
            .catch((error) => { 
                 console.error(error) 
        }) 
    }


    measurementsFilter(arrObjects, days) {
        // copy
        var data = arrObjects.slice()

        // convert date
        for (var j=0; j<data.length; j++){
            data[j].dsCollected = new Date(data[j].dsCollected)
        }

        // set n days to filter
        var d = new Date(new Date().setDate(new Date().getDate()-days))

        // filter time interval
        var filteredArray = data.filter(el=> {
        return el.dsCollected >= d 
        })

        // get sensor attributes
        var names = this.sensorAttrList(filteredArray, "name")
        var locs = this.sensorAttrList(filteredArray, "location")
        var mtype = this.sensorAttrList(filteredArray, "measurementType")

        // filter temp data
        var tempArray = filteredArray.filter(el=> {
            return el.measurementType === "temp"
        })

        var fName = this.focusSensorName(tempArray, this.state.focusName, names)
        var fValue = this.focusSensorValue(tempArray, fName)


        // save state
        this.setState({ 
            sensorNames: names,
            sensorLocations: locs,
            sensorMeasurementType: mtype,
            focusName: fName,
            focusValue: fValue,
            temperature: tempArray,
            days: days
       })
  
    }


    sensorAttrList(fArray, key) {
        var sensorAttributes = []
        for (var i=0; i<fArray.length; i++){
            if (sensorAttributes.includes(fArray[i][key])){
                continue
            } else {
                sensorAttributes.push(fArray[i][key])
            }    
        }
        return sensorAttributes
    }


    focusSensorValue(fArray, sensorName) {
        // filter data by sensor name 
        // then, take the most recent record (last record)
        var fValue = fArray.filter(el=> {
             return el.name === sensorName 
        })

        // treat undefined variable (occurs when filter returns no data)
        if (fValue.slice(-1)[0] == null) {
            fValue = "No data"
        } else {
            fValue = fValue.slice(-1)[0]["value"] + "°C"
        } 
        return fValue
    }


    focusSensorName(fArray, sensorName, namesList) {
        // name of sensor with most recent record
        var startName = fArray.slice(-1)[0]["name"]

       // set sensor name to focus on
       var fName = (sensorName === "" & namesList.length > 1) 
           ? startName
           : sensorName

       // treat undefined variable (occurs when filter returns no data)
       if (fName == null) { 
           fName = "Select" 
       }
    
       return fName
    }


    sevenDayHandle(){
        this.measurementsFilter(this.state.data, 7)
        this.setState({
            button7: "success", //change color of button7 to green
            button28: "primary",
            button365: "primary"
        })
    }

    twentyEightDayHandle(){
        this.measurementsFilter(this.state.data, 28)
        this.setState({
            button7: "primary",
            button28: "success", //change color of button28 to green
            button365: "primary"
       })
    }

    oneYearHandle(){
        this.measurementsFilter(this.state.data, 365)
        this.setState({
             button7: "primary",
             button28: "primary",
             button365: "success" //change color of button365 to green
        })
    }

    dropdownSelectionHandle(sn, n){
        this.setState({
            focusName: sn[n],
            focusValue: this.focusSensorValue(this.state.temperature, sn[n])
        })
    }

    render() {
        let button7col = this.state.button7
        let button28col = this.state.button28
        let button365col = this.state.button365
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
                     <DropdownButton bsStyle="info" id="1" title={this.state.focusName}
                         onSelect = {this.dropdownSelectionHandle.bind(this, sn)}
                     >
                          {menuItems}
                     </DropdownButton>
                     <Button bsStyle={button7col}
                         onClick={this.sevenDayHandle.bind(this)}>
                              7 days
                     </Button>
                     <Button bsStyle={button28col}
                         onClick={this.twentyEightDayHandle.bind(this)}>
                              28 days
                     </Button>
                     <Button bsStyle={button365col}
                         onClick={this.oneYearHandle.bind(this)}>
                              1 year
                     </Button>
                 </ButtonToolbar>
            </div>
        )

            return (
                <div className="App">

                    <header className="App-header">
                        <h1 className="App-title">Garden Monitor</h1>
                        <p> {String(this.state.pageLoadDate)} </p>
                    </header>

                    {buttonsInstance}  

                    <div className="TempContainer">
                        <h3 className="TempValue">{this.state.focusValue}</h3>
                    </div>
                </div>
            )
        }
    }

    export default App

