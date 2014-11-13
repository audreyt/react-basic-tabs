'use strict';

var React = require('react')
var copy  = require('copy-utils').copy

module.exports = React.createClass({

    displayName: 'TabPanel.Container',

    propTypes: {
        activeIndex     : React.PropTypes.number,

        defaultClassName: React.PropTypes.string,
        defaultStyle    : React.PropTypes.object,

        hiddenStyle     : React.PropTypes.object,

        activeClassName : React.PropTypes.string,
        activeStyle     : React.PropTypes.object
    },

    getDefaultProps: function(){
        return {
            activeIndex: 0,
            hiddenStyle: {
                display: 'none'
            }
        }
    },

    render: function(){

        return (
            React.createElement("section", {className: "basic-tabs-container"}, 
                this.props.children.map(this.renderItem, this)
            )
        )
    },

    renderItem: function(item, index, array){
        var props = this.props

        var hiddenStyle = props.hiddenStyle
        var activeIndex = props.activeIndex || 0

        //make sure the wrapping article gets the correct style
        //if it is the active item
        var style = {}
        var className = 'basic-tabs-item '

        if (index !== activeIndex){
            copy(hiddenStyle, style)
        } else {
            copy(props.activeStyle, style)
            className += props.activeClassName || ''
        }

        //default style for items
        if (props.defaultStyle){
            item.props.style = copy(props.defaultStyle, item.props.style)
        }

        //default className for items
        if (props.defaultClassName){
            item.props.className = item.props.className || ''
            item.props.className += ' ' + props.defaultClassName
        }

        return (
            React.createElement("article", {key: index, style: style, className: className}, 
                item
            )
        )
    }
})