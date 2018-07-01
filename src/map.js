import React, { Component } from "react"
import request from "axios"
import { feature } from "topojson-client"
import { geoCentroid } from "d3-geo"
import _ from "lodash";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
  Markers,
  Marker,
} from "react-simple-maps"


const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
  }

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            geographies: null,
            countries: [],
            center: [0,0],
            zoom: 1,
            input: ""
        }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount() {
        request.get("/maps/world-110m.json")
        .then(response => {
            const world = response.data
            const features = feature(world, world.objects[Object.keys(world.objects)[0]]).features
            this.setState({
                geographies: features,
                countries: features.map(feat => {
                    return {
                        coordinates: geoCentroid(feat),
                        iso3: feat.properties.ISO_A3,
                        name: feat.properties.NAME,
                    }
                })

                })
            })
        }

    handleInputChange(value) {
        this.setState({input : value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const {
            input,
            countries
        } = this.state

        let indexNo = _.findIndex(countries, function(o) {
                    return o.name === input
                })

        console.log(indexNo)
        this.setState({
            center: countries[indexNo].coordinates,
            zoom: 3
        })
        
    }
    
    render() {
        console.log(this.state)

        const {
            zoom,
            center,
            geographies
        } = this.state

        return (
        <div>
            <h1 className="heading-primary"> Search a country </h1>
            <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.input} onChange={event => this.handleInputChange(event.target.value)} />
            <input type="submit" value="Go!"/>
            </form>
            <div style={wrapperStyles}>
                <ComposableMap projection="orthographic" projectionConfig={{scale: 300}} width={800} height={800} style={{ width: "100%", height: "auto"}}>
                    <ZoomableGlobe zoom={zoom} center={center}>
                    <circle cx={400} cy={400} r={300} fill="transparent" stroke="#eceff1" />
                    <Geographies geography={geographies} disableOptimization>
                    {(geographies, projection) => 
                        geographies.map((geography, i) => {
                            return (
                                <Geography
                                    key={i}
                                    round
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                        fill: "#eceff1",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                        },
                                        hover: {
                                        fill: "#ff8000",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                        },
                                        pressed: {
                                        fill: "0000ff",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                        },
                                    }}
                                />
                            )
                        }
                    )}
                    </Geographies>
                    </ZoomableGlobe>
                </ComposableMap>
            </div>
        </div>
        )
    }
   
}

export default Map


