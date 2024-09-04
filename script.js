document.getElementById('addMembershipLink').addEventListener('click', function() {
    document.getElementById('addMembershipSection').classList.toggle('hidden');
    document.getElementById('updateMembershipSection').classList.add('hidden');
    document.getElementById('viewMembershipSection').classList.add('hidden');
    document.getElementById('deleteMembershipSection').classList.add('hidden');
});

document.getElementById('updateMembershipLink').addEventListener('click', function() {
    document.getElementById('updateMembershipSection').classList.toggle('hidden');
    document.getElementById('addMembershipSection').classList.add('hidden');
    document.getElementById('viewMembershipSection').classList.add('hidden');
    document.getElementById('deleteMembershipSection').classList.add('hidden');
});

document.getElementById('viewMembershipLink').addEventListener('click', function() {
    document.getElementById('viewMembershipSection').classList.toggle('hidden');
    document.getElementById('addMembershipSection').classList.add('hidden');
    document.getElementById('updateMembershipSection').classList.add('hidden');
    document.getElementById('deleteMembershipSection').classList.add('hidden');
    displayMemberships();
});

document.getElementById('deleteMembershipLink').addEventListener('click', function() {
    document.getElementById('deleteMembershipSection').classList.toggle('hidden');
    document.getElementById('addMembershipSection').classList.add('hidden');
    document.getElementById('updateMembershipSection').classList.add('hidden');
    document.getElementById('viewMembershipSection').classList.add('hidden');
});

document.getElementById('addMembershipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const duration = document.getElementById('membershipDuration').value;
    const membershipId = Date.now(); // Unique ID based on timestamp

    const membership = {
        id: membershipId,
        duration: duration,
        startDate: new Date().toISOString()
    };

    let memberships = JSON.parse(localStorage.getItem('memberships')) || [];
    memberships.push(membership);
    localStorage.setItem('memberships', JSON.stringify(memberships));

    alert('Membership added successfully!');
    document.getElementById('addMembershipForm').reset();
});

document.getElementById('updateMembershipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const membershipNumber = document.getElementById('membershipNumber').value;
    const newDuration = document.getElementById('newDuration').value;

    let memberships = JSON.parse(localStorage.getItem('memberships')) || [];
    const membership = memberships.find(m => m.id == membershipNumber);

    if (membership) {
        membership.duration = newDuration;
        localStorage.setItem('memberships', JSON.stringify(memberships));
        alert('Membership updated successfully!');
    } else {
        alert('Membership not found!');
    }

    document.getElementById('updateMembershipForm').reset();
});

document.getElementById('deleteMembershipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const membershipNumber = document.getElementById('deleteMembershipNumber').value;

    let memberships = JSON.parse(localStorage.getItem('memberships')) || [];
    const updatedMemberships = memberships.filter(m => m.id != membershipNumber);

    if (memberships.length !== updatedMemberships.length) {
        localStorage.setItem('memberships', JSON.stringify(updatedMemberships));
        alert('Membership deleted successfully!');
    } else {
        alert('Membership not found!');
    }

    document.getElementById('deleteMembershipForm').reset();
});

function displayMemberships() {
    let memberships = JSON.parse(localStorage.getItem('memberships')) || [];
    const membershipList = document.getElementById('membershipList');
    membershipList.innerHTML = ''; // Clear the list first

    if (memberships.length === 0) {
        membershipList.innerHTML = '<li>No memberships found.</li>';
    } else {
        memberships.forEach(membership => {
            const listItem = document.createElement('li');
            listItem.textContent = `Membership ID: ${membership.id}, Duration: ${membership.duration}, Start Date: ${new Date(membership.startDate).toLocaleDateString()}`;
            membershipList.appendChild(listItem);
        });
    }
}
