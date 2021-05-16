import { userDefault } from './default/userReducer';
import { appDefault } from './default/appReducer';
import { modalDefault } from './default/ModalReducer';
export const appDefaultReducer = {
    appReducer: appDefault, //persinstent not to be in black list if settings should persist
    userReducer: userDefault,
    modalReducer: modalDefault,


};
