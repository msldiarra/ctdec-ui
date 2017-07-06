import React from 'react'
import Relay from 'react-relay'
import AppMessage from './common/AppMessage';
import SearchLocation from './common/SearchLocation';
import ReactDOM from 'react-dom';
import Chance from 'chance';
import RequestAppointmentByNINAMutation from './mutation/RequestAppointmentByNINAMutation'


class NINAAppointmentRequest extends React.Component {

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
            city: location.city, country: location.country
        });
    }

    onAppointmentRequest(e) {

        e.preventDefault();

        var reference =  this.refs.nina.value;
        var city = this.state.city;
        var country = this.state.country;
        var mail =  this.refs.email.value;
        var phone =  new Chance().word({length: 8, pool: '0123456789'});

        var requestAppointmentByNINAMutation = new RequestAppointmentByNINAMutation({
            viewer: this.props.viewer,
            viewerId: this.props.viewer.id,
            nina: reference,
            city: city,
            country: country,
            mail: mail,
            phone: phone
        });

        var onSuccess = () => this.context.router.push('/');

        var onFailure = (transaction) => this.setState({message : "Désolé, nous avons rencontré un problème lors de l'enregistrement." +
        " Contactez l'administrateur"});

        Relay.Store.commitUpdate(requestAppointmentByNINAMutation, {onSuccess, onFailure})

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
                                        <span className="input-group-addon">NINA</span>
                                        <input type="text" ref="nina" id="nina" className="form-control" placeholder="Numéro NINA" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon">Email</span>
                                        <input type="text" ref="email" id="email" className="form-control" placeholder="Adresse mail" />
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
                                    <inupt type="submit" style={{width:'100%'}}className="btn btn-primary" onClick={this.onAppointmentRequest.bind(this)}><b>Demander un RDV</b></inupt>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


NINAAppointmentRequest.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(NINAAppointmentRequest, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
               id,
               ${SearchLocation.getFragment('viewer')}
          }
    `,
    }
});
