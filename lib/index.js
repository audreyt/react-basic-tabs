'use strict';

var React        = require('react')
var copy         = require('copy-utils').copy
var Strip        = require('./Strip')
var Container    = require('./Container')

var StripFactory = React.createFactory(Strip)

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

        stripListStyle      : React.PropTypes.object,
        stripFactory        : React.PropTypes.func
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

        var props = copy(this.props)

        props.children = props.children || []

        var activeIndex = props.activeIndex || 0

        props.activeIndex = Math.min(activeIndex, props.children.length - 1)

        props.className = props.className || ''

        props.className += ' tab-panel'

        var StripComponent = this.renderStrip(props, activeIndex)

        var ContainerComponent = React.createElement(Container, {key: "container", 
                activeIndex: props.activeIndex, 

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

    renderStrip: function(props){
        var stripProps = {
            key            :"strip",
            onChange       : this.handleChange,

            enableScroll   : props.enableScroll,
            scrollerStyle  : props.scrollerStyle,
            scrollerFactory: props.scrollerFactory,
            scrollerWidth  : props.scrollerWidth,
            scrollerProps  : props.scrollerProps,

            activeIndex    : props.activeIndex,

            activeStyle    : props.activeTitleStyle,
            activeClassName: props.activeTitleClassName,

            titleStyle     : props.titleStyle,
            titleClassName : props.titleClassName,

            style          : props.stripStyle,
            children       : props.children
        }

        if (props.stripFactory){
            return props.stripFactory(stripProps, StripFactory)
        }

        return StripFactory(stripProps)
    },

    handleChange: function(index){
        ;(this.props.onChange || emptyFn)(index)
    }
})

TabPanel.Strip     = Strip
TabPanel.Container = Container

module.exports = TabPanel