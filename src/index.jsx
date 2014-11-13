'use strict';

var React     = require('react')
var copy      = require('copy-utils').copy
var copyList  = require('copy-utils').copyList
var copyKeys  = require('copy-utils').copyKeys
var Strip     = require('./Strip')
var Container = require('./Container')

var StripFactory     = React.createFactory(Strip)
var ContainerFactory = React.createFactory(Container)

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

        var StripComponent = this.renderStrip(props)

        var ContainerComponent = this.renderContainer(props)


        var Content = props.stripPosition == 'bottom'?
                            [ContainerComponent, StripComponent]:
                            [StripComponent, ContainerComponent]

        return (
            <div {...props} >
                {Content}
            </div>
        )
    },

    renderContainer: function(props) {
        var containerProps = copyList(props, [
                'activeIndex',
                'activeClassName',
                'activeStyle',
                'defaultStyle',
                'defaultClassName',
                'hiddenStyle',
                'children'
            ])

        containerProps.key = 'container'

        return ContainerFactory(containerProps)
    },

    renderStrip: function(props){
        var stripProps = copyKeys(props, {},
            {
                enableScroll        : 1,
                scrollerStyle       : 1,
                scrollerFactory     : 1,
                scrollerWidth       : 1,
                scrollerProps       : 1,

                activeIndex         : 1,

                titleStyle          : 1,
                titleClassName      : 1,

                children            : 1,
                stripStyle          : 'style',
                activeTitleStyle    : 'activeStyle',
                activeTitleClassName:  'activeClassName'
        })

        stripProps.key      = 'strip'
        stripProps.onChange = this.handleChange || emptyFn

        if (props.stripFactory){
            return props.stripFactory(stripProps, StripFactory)
        }

        return StripFactory(stripProps)
    },

    handleChange: function(index){
        this.props.onChange(index)
    }
})

TabPanel.Strip     = Strip
TabPanel.Container = Container

module.exports = TabPanel