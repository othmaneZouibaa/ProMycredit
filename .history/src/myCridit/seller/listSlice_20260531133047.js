            .addCase(addCredit.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addCredit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
