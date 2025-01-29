use anchor_lang::prelude::*;

declare_id!("99oEGjcb7XLjSApGPLKbR7XczUhuAs7NUJW7qCSLC9w8");

#[program]
pub mod crowfunding {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
