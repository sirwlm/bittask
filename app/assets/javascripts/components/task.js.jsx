var Task = React.createClass({
  getInitialState: function() {
    return {};
  },

  loadNextTask: function() {
    $.ajax({
      url: "/api/v1/tasks/latest",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          loaded: true,
          id: data.id,
          title: data.title,
          choices: data.choices,
          cost: data.cost,
          address: data.address,
          balance: data.balance});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  handleAnswerUpdate: function() {
    this.loadNextTask()
    this.props.updateTask()
  },

  componentDidMount: function() {
    this.loadNextTask();
  },

  render: function() {
    if (!this.state.loaded) {
      return (<div></div>)
    }
    var choices = [];
    var task_id = this.state.id
    var boundClick = this.handleAnswerUpdate; // When answer is clicked, we want to run loadNextTask
    if (this.state.choices) {
      this.state.choices.forEach(function(choice, index) {
        choices.push(<Answer key={index} choice={choice} task_id={task_id} on_click={boundClick} />);
      });
    } else {
      choices.push(<Answer key="0" choice="Free form" task_id={task_id} on_click={boundClick} />);
    }
    return (
      <div>
        <div>{this.state.title}</div>
        {choices}
        <div>Cost: {this.state.cost}</div>
        <div>Address: {this.state.address}</div>
        <div>Balance: {this.state.balance}</div>
      </div>
    );
  }
});
