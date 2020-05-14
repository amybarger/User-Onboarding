import React from 'react';

const teamStyle = {
  color: 'white',
  background: 'green',
  width: '100%',
  padding: '2%',
  fontSize: '20px',
};

const InviteList = props => {
  console.log("team props", props);
  
  return (
    <div className="team-members">
      {props.members.map( member => (
        <div className="member" key={member.id} style={teamStyle}>
          <h2>{member.name}</h2>
          <p>{member.email}</p>
          <p>{member.favoriteCharacter}</p>
          </div>
          ))}
        
</div>
  )
};
  
export default InviteList;