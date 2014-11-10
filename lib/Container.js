'use strict';

var React = require('react')
var copy  = require('copy-utils').copy

module.exports = React.createClass({displayName: 'exports',

    propTypes: {
        activeIndex     : React.PropTypes.number,

        defaultClassName: React.PropTypes.string,
        defaultStyle    : React.PropTypes.object,

        activeClassName : React.PropTypes.string,
        activeStyle     : React.PropTypes.object
    },

    getDefaultProps: function(){
        return {
            activeIndex: 0
        }
    },

    render: function(){

        return (
            React.createElement("section", {className: "tab-panel-container"}, 
                this.props.children.map(this.renderItem, this)
            )
        )
    },

    renderItem: function(item, index, array){
        var props = this.props
        var activeIndex = props.activeIndex || 0

        //make sure the wrapping article gets the correct style
        //if it is the active item
        var style = {}
        var className = 'tab-panel-item '

        if (index !== activeIndex){
            style.display = 'none'
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