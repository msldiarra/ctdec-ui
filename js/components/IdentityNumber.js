import React from 'react'
import Relay from 'react-relay'
import AppMessage from './common/AppMessage';
import ReactDOM from 'react-dom';



class IdentityNumber extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message : "",
            document : 0
        } ;
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
                                <div className="btn-group btn-group-justified col-md-12" role="group" >
                                    <p>
                                        Bienvenue !
                                        <br/><br/>
                                        Ici, vous pouvez prendre un rendez-vous pour récupérer votre fiche individuelle.
                                        <br/><br/>
                                        Pour une demande de fiche individuelle, il est nécessaire de fournir des informations.
                                        <br/>
                                        <br/>
                                        Avez un des numéros suivants ?
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="btn-group btn-group-justified col-md-12" role="group" >
                                    <div className="btn-group" role="group">
                                        <button onClick={() => this.context.router.push('/appointment/nina')} type="button" className={"btn btn-default " + (this.state.document ==  1? "active" : "")} value="1">NINA</button>
                                    </div>
                                    <div className="btn-group" role="group">
                                        <button onClick={() => this.context.router.push('/appointment/ravec')} type="button" className={"btn btn-default " + (this.state.document ==  2? "active" : "")} value="2">Récipissé RAVEC</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="btn-group btn-group-justified col-md-12" role="group" >
                                    <div className="btn-group" role="group">
                                        <hr/>
                                        <br/>
                                        <button onClick={() => this.context.router.push('/appointment/default')} type="button" className={"btn btn-default " + (this.state.document ==  1? "active" : "")} value="3">
                                            Cliquez ici si vous n'avez aucun numéro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


IdentityNumber.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(IdentityNumber, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
               id,
          }
    `,
    }
});
