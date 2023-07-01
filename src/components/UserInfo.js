export default class UserInfo {
    constructor({ profileName, profileDesc, profileAvatar }) {
        this._profileName = profileName;
        this._profileDesc = profileDesc;
        this._profileID = null;
        this._profileAvatar = profileAvatar;
    }

    getUserInfo() {
        this._userInfo = {
            profileName: this._profileName.textContent,
            profileDesc: this._profileDesc.textContent,
            profileID: this._profileID,
            profileAvatar: this._profileAvatar
        };
        return this._userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDesc.textContent = data.about;
        this._profileID = data._id;
        this._profileAvatar.src = data.avatar;
    }
}