import React from 'react';
import './Profile.scss'; // Style file you'll create

const Profile = () => {
  return (
    <div className="profile-con">
    
    <div className="profile-right">
    <div className="form-row">
      <label>Username</label>
      <input type="text" defaultValue="admin" />
    </div>
    <div className="form-row">
      <label>Email</label>
      <input type="email" defaultValue="Ona.Kris@gmail.com" />
    </div>
    <div className="form-row">
      <label>Phone</label>
      <input type="text" defaultValue="1-785-945-1041 x87572" />
    </div>     

    <div className="form-row">
      <label>About</label>
      <textarea
        rows={4}
        defaultValue={`Desolo aetas quasi. Fugit ustulo vitiosus summopere conatus aliqua conicio textus asperiores acervus. Aetas modi chirographum tibi volutabrum sublime teres titulus aetas auctor.`}
      ></textarea>
    </div>
    <button className="save-btn">Save Changes</button>
  </div>
    </div>
  );
};

export default Profile;
