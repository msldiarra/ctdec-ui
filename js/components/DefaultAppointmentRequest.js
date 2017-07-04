import React from 'react'
import Relay from 'react-relay'
import AppMessage from './common/AppMessage';
import SearchLocation from './common/SearchLocation';
import ReactDOM from 'react-dom';



class DefaultAppointmentRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message : "",
            country: '',
            city: '',
            location: ''
        } ;
    }

    onLocationEnter(location) {
        this.setState({ location : location.city ? location.city +', '+ location.country: location.city,
            city: location.city,
        });
    }


    render() {
        const text = this.state.message;


        return (
            <div className="">
                <div className="page-header col-md-6 center-block row">
                    <h3>
                        <span className="col-md-12">Fiche individuelle</span>
                    </h3>
                </div>

                {text? <AppMessage message={text} /> : ''}

                <form className="form-horizontal padding-20" name="add-property">
                    <div className="page-content row">
                        <div className="col-md-6 center-block">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="last_name" id="last_name" className="form-control" placeholder="Nom de famille" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="first_name" id="first_name" className="form-control" placeholder="Prénom" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="father_first_name" id="father_first_name" className="form-control" placeholder="Prénom de la père" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="mother_last_name" id="mother_last_name" className="form-control" placeholder="Nom de jeune fille de la mère" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="mother_first_name" id="mother_first_name" className="form-control" placeholder="Prénom de la mère" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <SearchLocation search="" placeHolder="Entrer la ville ou le pays"
                                                    onLocationEnter={this.onLocationEnter.bind(this)}
                                                    defaultValue=""
                                        {...this.props} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <inupt type="submit" style={{width:'100%'}}className="btn btn-primary" onClick={() => console.log('request appointment')}><b>Demander un RDV</b></inupt>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


DefaultAppointmentRequest.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(DefaultAppointmentRequest, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
               id,
               ${SearchLocation.getFragment('viewer')}
          }
    `,
    }
});
