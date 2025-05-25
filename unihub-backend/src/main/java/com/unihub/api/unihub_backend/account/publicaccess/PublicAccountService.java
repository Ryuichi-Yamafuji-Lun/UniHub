package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.mapper.AccountMapper;

@Service
public class PublicAccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    
    public PublicAccountService(AccountRepository accountRepository, AccountMapper accountMapper) {
        this.accountRepository = accountRepository;
        this.accountMapper = accountMapper;
    }

    // create account 
    @Transactional
    public Account registerAccount(AccountRegistrationRequest request) {
        Account account = accountMapper.fromRegistrationRequest(request);
        return accountRepository.save(account);
    }
}
