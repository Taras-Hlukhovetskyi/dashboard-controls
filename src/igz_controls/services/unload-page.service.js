(function () {
    'use strict';

    angular.module('iguazio.dashboard-controls')
        .factory('UnloadPageService', UnloadPageService);

    function UnloadPageService($window) {
        return {
            registerBeforeUnloadPageCallback: registerBeforeUnloadPageCallback
        };

        //
        // Public methods
        //

        /**
         * Registers beforeunload page callback.
         * It calls isDataChanged callback to track if changes has been made on the page.
         * If yes - then show confirmation dialog which prevents from user to lose unsaved data
         * @param {Function} isDataChanged - callback which tracks if changes has been made
         */
        function registerBeforeUnloadPageCallback(isDataChanged) {

            // @if !IGZ_E2E_TESTING
            $window.addEventListener('beforeunload', function (e) {
                if (isDataChanged()) {

                    // Cancel the event
                    e.preventDefault();

                    // Chrome requires returnValue to be set
                    e.returnValue = true;
                }
            });
            // @endif
        }
    }
}());
