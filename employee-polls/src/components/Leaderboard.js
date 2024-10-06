import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/leader-board.css'; 


const Leaderboard = () => {
  const users = useSelector((state) => state.users);
  const sortedUsers = Object.values(users).sort(
    (a, b) => (Object.keys(b.answers).length + b.questions.length) -
              (Object.keys(a.answers).length + a.questions.length)
  );

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className='lb-border'>
          <tr >
            <th scope="col" className='lb-border'>#</th>
            <th scope="col" className='lb-border'>User</th>
            <th scope="col" className='lb-border'>Answered Questions</th>
            <th scope="col" className='lb-border'>Created Questions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id}>
              <td className='lb-border align-middle'>{index + 1}</td>
              <td className='lb-border'>
                <div >
                  <img
                    src={require(`../images/${user.name}.png`)}
                    alt={`Avatar of ${user.name}`}
                    className="img-style"
                  />
                  <span>{user.name}</span>
                </div>
              </td>
              <td className='lb-border align-middle'>{Object.keys(user.answers).length}</td>
              <td className='lb-border align-middle'>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;