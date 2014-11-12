'use strict';

var React     = require('react')

var Strip     = require('./Strip')
var Container = require('./Container')

function emptyFn(){}

var TabPanel = React.createClass({displayName: 'TabPanel',

    propTypes: {
        activeIndex         : React.PropTypes.number,

        activeStyle         : React.PropTypes.object,
        activeClassName     : React.PropTypes.string,

        defaultStyle        : React.PropTypes.object,
        defaultClassName    : React.PropTypes.string,

        titleStyle          : React.PropTypes.object,
        titleClassName      : React.PropTypes.string,
        activeTitleStyle    : React.PropTypes.object,
        activeTitleClassName: React.PropTypes.string,

        onChange            : React.PropTypes.func,

        stripListStyle      : React.PropTypes.object
    },

    getDefaultProps: function(){
        return {
            activeIndex: 0,

            activeStyle: {},
            activeClassName: 'active',

            titleStyle: {},
            titleClassName: '',
            activeTitleStyle: {},
            activeTitleClassName: 'active',

            defaultStyle: {},
            defaultClassName: '',

        }
    },

    getInitialState: function(){
        return {}
    },

    render: function(){

        var props = this.props

        props.children = props.children || []

        var activeIndex = props.activeIndex || 0

        activeIndex = Math.min(activeIndex, props.children.length - 1)

        props.className = props.className || ''

        props.className += ' tab-panel'

        var StripComponent = React.createElement(Strip, {key: "strip", onChange: this.handleChange, 

                    enableScroll: props.enableScroll, 
                    scrollerStyle: props.scrollerStyle, 
                    scrollerFactory: props.scrollerFactory, 
                    scrollerWidth: props.scrollerWidth, 

                    activeIndex: activeIndex, 

                    activeStyle: props.activeTitleStyle, 
                    activeClassName: props.activeTitleClassName, 

                    titleStyle: props.titleStyle, 
                    titleClassName: props.titleClassName, 

                    style: props.stripStyle
                }, 
                    props.children
                )

        var ContainerComponent = React.createElement(Container, {key: "container", 
                    activeIndex: activeIndex, 

                    activeClassName: props.activeClassName, 
                    activeStyle: props.activeStyle, 

                    defaultStyle: props.defaultStyle, 
                    defaultClassName: props.defaultClassName, 

                    hiddenStyle: props.hiddenStyle}, 

                    this.props.children
                )


        var Content = props.stripPosition == 'bottom'?
                            [ContainerComponent, StripComponent]:
                            [StripComponent, ContainerComponent]

        return (
            React.createElement("div", React.__spread({},  props), 
                Content
            )
        )
    },

    handleChange: function(index){
        ;(this.props.onChange || emptyFn)(index)
    }
})

TabPanel.Strip     = Strip
TabPanel.Container = Container

module.exports = TabPanel