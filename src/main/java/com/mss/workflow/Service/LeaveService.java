package com.mss.workflow.Service;

import com.mss.workflow.Entity.Leave;
import com.mss.workflow.Repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveService implements LeaveServiceI  {

@Autowired
    LeaveRepository leaveRepository;
    @Override
        public Leave leaverrequestuser(Leave leaverequest) {
            leaverequest.setState(false);
            return leaveRepository.save(leaverequest);

        }
}
