
'use strict';

var React = require('react')
var TabPanel = require('./src')

var App = React.createClass({

    getInitialState: function(){
        return {
        }
    },

    handleChange: function(index){
        this.setState({
            activeIndex: index
        })
    },

    render: function() {
        return <TabPanel
            activeIndex={this.state.activeIndex}
            onChange={this.handleChange}
            titleStyle={{padding: 10}}
            defaultStyle={{padding: 10}}
        >
            <div tabTitle="x" title="One">first</div>
            <div title="Two">second</div>
            <div title="Three">third</div>
        </TabPanel>
    }
})

React.render((
    <App />
), document.getElementById('content'))