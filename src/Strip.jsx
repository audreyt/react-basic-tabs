'use strict';

var React = require('react')
var copy  = require('copy-utils').copy

var LIST_STYLE = {
    listStyle: 'none',
    margin   : 0,
    padding  : 0
}

var LIST_ITEM_STYLE = {
    display: 'inline-block'
}

module.exports = React.createClass({

    propTypes: {
        activeIndex    : React.PropTypes.number,
        activeStyle    : React.PropTypes.object,
        activeClassName: React.PropTypes.string,

        titleStyle    : React.PropTypes.object,
        titleClassName: React.PropTypes.string

        //each item in the TabPanel can also specify a titleStyle
        //and a titleClassName, which are added to the values in props
    },

    getDefaultProps: function(){
        return {
            activeClassName: '',
            activeStyle: {},
        }
    },

    render: function(){

        var props = this.props

        var activeIndex = props.activeIndex || 0

        var activeStyle     = props.activeStyle
        var activeClassName = props.activeClassName

        var baseStyle = copy(LIST_ITEM_STYLE)
        copy(props.titleStyle, baseStyle)

        var baseClassName = [props.titleClassName || '', 'tab-panel-item-title']

        var nodes = props.children.map(function(child, index){
            var props = child.props
            var title = props.tabTitle || props.title

            var titleStyle = copy(baseStyle)

            //ALLOW each item to also specify a titleStyle
            copy(props.titleStyle, titleStyle)

            //and a titleClassName
            var titleClassName = baseClassName.concat(props.titleClassName || '')

            if (index == activeIndex){
                copy(activeStyle, titleStyle)
                titleClassName.push(activeClassName || '')
            }

            return (
                <li key={index} onClick={this.handleChange.bind(this, index)}
                    style={titleStyle}
                    className={titleClassName.join(' ')}>
                    <a href="#">{title}</a>
                </li>
            )
        }, this)

        return (
            <nav className='tab-panel-strip'>
                <ul className='tab-panel-strip-list' style={LIST_STYLE}>
                    {nodes}
                </ul>
            </nav>
        )
    },

    handleChange: function(index, event){
        event.preventDefault()
        this.props.onChange(index)
    }
})