export default class UserInfo {
    constructor({ profileName, profileDesc }) {
        this._profileName = profileName;
        this._profileDesc = profileDesc;
    }

    getUserInfo() {
        this._userInfo = {
            profileName: this._profileName.textContent,
            profileDesc: this._profileDesc.textContent
        };
        return this._userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDesc.textContent = data.description;
    }
}