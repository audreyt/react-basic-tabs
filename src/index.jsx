'use strict';

var React = require('react')
var Strip = require('./Strip')
var Container = require('./Container')

function emptyFn(){}

var TabPanel = React.createClass({

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

        onChange            : React.PropTypes.func
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

        var activeIndex = props.activeIndex || 0

        activeIndex = Math.min(activeIndex, props.children.length - 1)

        return (
            <div className={'tab-panel ' + (this.props.className || '')}>
                <Strip onChange={this.handleChange}

                    activeIndex={activeIndex}

                    activeStyle={props.activeTitleStyle}
                    activeClassName={props.activeTitleClassName}

                    titleStyle={props.titleStyle}
                    titleClassName={props.titleClassName}
                >
                    {props.children}
                </Strip>

                <Container
                    activeIndex={activeIndex}

                    activeClassName={props.activeClassName}
                    activeStyle={props.activeStyle}

                    defaultStyle={props.defaultStyle}
                    defaultClassName={props.defaultClassName}>

                    {this.props.children}
                </Container>
            </div>
        )
    },

    handleChange: function(index){
        ;(this.props.onChange || emptyFn)(index)
    }
})

TabPanel.Strip     = Strip
TabPanel.Container = Container

module.exports = TabPanel